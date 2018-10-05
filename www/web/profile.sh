#!/bin/bash

echo "" > ../../logs/my-errors.log
echo "# Run this to watch log in real time." >> ../../logs/my-errors.log
echo "# To stop watching press 'CTRL-C' to quit 'less' follow mode," >> ../../logs/my-errors.log
echo "# end then press 'q' to quit 'less'.\n\n" >> ../../logs/my-errors.log



sed -i 's/^\($prof_enabled\) *= *false; *$/\1=true;/' prof.php
#tail -f ../../logs/my-errors.log
less --follow-name +F ../../logs/my-errors.log
sed -i 's/^\($prof_enabled\) *= *true; *$/\1=false;/' prof.php
