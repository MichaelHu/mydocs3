rm docs.tar.gz
tar zcvf docs.tar.gz docs
ftp hdm0571@hdm0571.gotoftp1.com <<EOF
cd wwwroot
ls
put docs.tar.gz
EOF
