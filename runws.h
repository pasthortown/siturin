#!/bin/bash
screen -AmdS dinardap php -S localhost:9000 -t server-dinardap/public
screen -AmdS mailer php -S localhost:9003 -t server-mailer/public
screen -AmdS dinardap-nuevo php -S localhost:9004 -t server-dinardap-nuevo/public
screen -AmdS consultor php -S localhost:9001 -t server-consultor/public
screen -AmdS exporter php -S localhost:9002 -t server-exporter/public
screen -AmdS auth php -S localhost:8000 -t server-auth/public
screen -AmdS base php -S localhost:8001 -t server-base/public
screen -AmdS alojamiento php -S localhost:8002 -t server-alojamiento/public
screen -AmdS financiero php -S localhost:8003 -t server-financiero/public

