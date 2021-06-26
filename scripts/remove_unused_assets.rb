#!/usr/bin/env ruby

require 'fileutils'
require 'pathname'

file_paths = Pathname.glob '_posts/*.md'

file_paths.each do |file_path|
  file_name = File.basename file_path.to_s, '.md'

  asset_path = File.join 'assets/images', file_name
  next unless File.exist? asset_path

  file_content = File.read file_path

  Dir.foreach asset_path do |asset|
    asset_base_name = File.basename asset
    if file_content.include? asset_base_name
      next
    end
    FileUtils.rm File.join(asset_path, asset), force: true
    puts "remove #{asset}"
  end
end