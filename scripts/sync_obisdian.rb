#!/usr/bin/env ruby
require 'reverse_markdown'
require 'ruby-pinyin'
require 'tempfile'
require 'date'

obsidian_prefix = '~/Library/Mobile Documents/iCloud~md~obsidian/Documents/知识'
file_path = ARGV[0]
file_path = File.expand_path File.join(obsidian_prefix, file_path)

unless File.exist? file_path
  puts "File is not exist: #{file_path}"
  exit 1
end

md = File.read file_path
file_name = File.basename file_path, '.md'
file_name_pinyin = PinYin.permlink(file_name)

level_tags = md.scan(/^#输出等级\/(.*)$/).flatten.first
category_tags = md.scan(/^#输出类别\/(.*)$/).flatten.first.gsub('/', '-')
feishu_link = md.scan(/<iframe\s+src="([^"]*)"/).flatten.first

puts "等级：#{level_tags}"
puts "类别：#{category_tags}"
puts "feishu: #{feishu_link}"

today = Date.today.to_s
file_prefix = <<~PREFIX
---
title: #{file_name}
date: #{today}
feishu: #{feishu_link}
tags:
  - #{level_tags}
  - #{category_tags}
---

PREFIX

puts "开始获取网页内容:"

Tempfile.create do |file|
  `wget -q -O #{file.path} #{feishu_link}`
  # puts File.read(file.path)
  html = File.read file.path
  result = ReverseMarkdown.convert(html, unknown_tags: :bypass)
  result_lines = result.split("\n")
  last_title_line = result_lines.reverse.find { |line| line.include? file_name }
  last_title_line_index = result_lines.index last_title_line
  result_lines = result_lines.drop(last_title_line_index + 1)
  result_lines.reject! { |line| line.empty? }
  result_lines.insert 1, "\n> 这里只是一个静态存档，完整文章请到 [飞书](#{feishu_link}) 查看\n"
  result_lines.insert 1, "\n<!--more-->\n"
  File.open "blog/_posts/#{today}-#{file_name_pinyin}.md", 'w+' do |f|
    f.write file_prefix
    f.write result_lines.join("\n")
  end
end

