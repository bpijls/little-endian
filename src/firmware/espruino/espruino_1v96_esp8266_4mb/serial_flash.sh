#!/bin/bash
# file: serial_flash.sh
esptool.py --port /dev/cu.Repleo-CH341-00002014 --baud 460880 erase_flash
esptool.py --port /dev/cu.Repleo-CH341-00002014 --baud 460800 write_flash --flash_freq 80m --flash_mode dio --flash_size 4MB-c1 0x0000 "boot_v1.6.bin" 0x1000 espruino_esp8266_user1.bin 0x3FC000  esp_init_data_default.bin 0x3FE000 blank.bin
