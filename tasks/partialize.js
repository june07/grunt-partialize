/*
 * grunt-partialize
 * https://github.com/june07/grunt-partialize
 *
 * Copyright (c) 2016 june07
 * Licensed under the MIT license.
 */

'use strict';

var LineByLineReader = require('line-by-line'),
  fs = require('fs'),
  os = require('os'),
  path = require('path');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('partialize', 'Split whole html files into partial html files.', function() {
    var self = this;
    // Merge task-specific and/or target-specific options with these defaults.
    var options = self.options({
    });

    // Iterate over all specified file groups.    
    self.files.forEach(function(f) {
      var lr = new LineByLineReader(f.orig.src[0]);

      var tags = { 'basetagBegin': '<!-- '+options.baseTagName,
        'basetagEnd': '<!-- //'+options.baseTagName },
        readon = false,
        actions = {
          "copy": { "name": "copy", "filename": null }
        },
        actionobject = null,
        done = self.async();

      // Open template file
      var template = path.join(f.orig.dest, options.baseTagName + "_" + path.basename(f.orig.src));
      fs.writeFileSync(template, "");

      lr.on('error', function (err) {
        // 'err' contains error object
        console.dir("ERROR:" +err);
      });

      lr.on('line', function (line) {
        // On first read of first line, the template file needs to be started.
        var untrimmedLine = line;
        line = line.trim();
        if (! readon) {
          // Check for control tag to turn reading on.  Line starts with 'basetagBegin' so it has to be a control line
          if (line.indexOf(tags.basetagBegin) !== -1) {
            var actionstring = line.substring(line.indexOf(":")+1, line.indexOf(" ", line.indexOf(":")));
            actionobject = actions[actionstring];
            switch (actionobject.name) {
              case "copy":
                var json = line.substring(line.indexOf('{'), line.indexOf(" ", line.indexOf('}')));
                var tokens = JSON.parse(json);
                actionobject.filename = path.join(f.orig.dest, options.baseTagName + "_" + tokens.filename);
                fs.writeFileSync(actionobject.filename, "");
                // Write <div ui-view> tag to template
                fs.appendFileSync(template, '<div ui-view="'+tokens.uiview+'"></div>'+ os.EOL);
                readon = true;
              break;
            }
          } else {
            // Writing partial files is off, so the lines must be template lines.  The line is also not a control tag line.
            fs.appendFileSync(template, untrimmedLine + require('os').EOL);
          }
        // Line reading is turned on.
        } else if (readon && (line.trim().indexOf(tags.basetagEnd) === -1)) {
          fs.appendFileSync(actionobject.filename, untrimmedLine + os.EOL);
        // Line ending tag found so turn line reading off.
        } else if (readon && (line.trim().indexOf(tags.basetagEnd) !== -1)) {
          readon = false;
        }
        // 'line' contains the current line without the trailing newline character.
      });

      lr.on('end', function () {
        // All lines are read, file is closed now.
        done("END");
      });
    });
  });

};
