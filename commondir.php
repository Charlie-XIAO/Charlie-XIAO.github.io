<?php
$files = scandir(".");
echo "<table>";
echo "<tr>";
echo "<th style='width: 30%; text-align: left; font-weight: bold; font-family: Courier New;'>File Name</th>";
echo "<th style='width: 20%; text-align: left; font-weight: bold; font-family: Courier New;'>File Size</th>";
echo "<th style='width: 20%; text-align: left; font-weight: bold; font-family: Courier New;'>File Type</th>";
echo "<th style='width: 20%; text-align: left; font-weight: bold; font-family: Courier New;'>Last Modified</th>";
echo "</tr>";
echo "<tr>";
foreach($files as $file) {
    if ($file != "." && $file != ".." && $file != "index.php") {
        $path = "./$file";
        $size = filesize($path);
        $type = mime_content_type($path);
        if ($type == "directory") {
            $type = "&lt;directory&gt;";
        }
        $mod_time = date("Y-m-d H:i:s", filemtime($path));
        echo "<tr><td><a href='../$dirname/$file'>$file</a></td><td>$size bytes</td><td>$type</td><td>$mod_time</td></tr>";
    }
}
echo "</table>";
?>