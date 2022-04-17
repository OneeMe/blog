#!/usr/bin/env ruby
require 'ruby-pinyin'
require 'fileutils'
require 'date'

title = ARGV.first
if title.nil?
  puts "Usage: new.rb <title>"
  exit
end
file_name_pinyin = PinYin.permlink(title)
date = Time.now.to_date.to_s
file_path = File.join('blog','_posts', "#{date}-#{file_name_pinyin}.md")
File.open file_path, "w+" do |f|
  f.puts <<~EOF
  ---
  title: #{title}
  date: #{date} 00:00 +0800
  typora-root-url: ../.vuepress/public
  typora-copy-images-to: ../.vuepress/public/assets/images/${filename}
  tags: 
    - 白银
    - Computer-Tools-PackageManager
  ---
  <!--more-->
  EOF
end
