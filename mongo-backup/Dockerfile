FROM ubuntu:20.04

# Disable interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install cron, MongoDB tools, and bash
RUN apt-get update && \
    apt-get install -y cron wget gnupg curl bash && \
    wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add - && \
    echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list && \
    apt-get update && \
    apt-get install -y mongodb-org-tools && \
    apt-get clean

# Copy backup script
COPY backup.sh /usr/local/bin/backup.sh
RUN chmod +x /usr/local/bin/backup.sh

# Add cron job (every 5 minutes)
# RUN echo "*/5 * * * * root /usr/local/bin/backup.sh >> /var/log/cron.log 2>&1" > /etc/cron.d/mongo-backup
RUN echo "*/15 * * * * root /usr/local/bin/backup.sh >> /var/log/cron.log 2>&1" > /etc/cron.d/mongo-backup
RUN chmod 0644 /etc/cron.d/mongo-backup
# No crontab command here! Cron reads /etc/cron.d automatically.


# Apply cron job and start cron
RUN chmod 0644 /etc/cron.d/mongo-backup && \
    crontab /etc/cron.d/mongo-backup

# Create log file
RUN touch /var/log/cron.log

# Create backup folder
VOLUME /backup

CMD cron && tail -f /var/log/cron.log
