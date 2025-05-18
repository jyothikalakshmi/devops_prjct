#!/bin/bash

# Create backups directory if not exists
mkdir -p /backup

# Generate timestamp
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")

# Dump MongoDB data into /backup folder with timestamp
mongodump --host=mongo --port=27017 --out="/backup/mongo_backup_$TIMESTAMP"

echo "Backup completed at $TIMESTAMP"
