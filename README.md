# AlarmOn Application

## Requirements

- Node and npm
```
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y npm
```

- Tools you will need
```
sudo apt-get install git
sudo apt-get install curl
```

## Configure Bitbucket
#### Setup Git client
```
git config --global user.email "[YOUR_EMAIL]"
git config --global user.name "[YOUR_NAME]"
```

#### Setup SSH for BitBucket
- Generate public / private keys: `ssh-keygen`
- Copy the public key: `cat ~/.ssh/id_rsa.pub`
  - or with xclip: `cat ~/.ssh/id_rsa.pub | xclip -sel clip`

- Login to bitbucket
- Click on the avatar icon in the lower left corner
- Select **Bitbucket Settings**
- Select **SSH Keys**  from the menu ( Under Security )
- Click on the **Add key** button
- Paste your publiic key to the key field
- Give an identifiable name for the key

## Install and Run Server
- For details check the Readme under the **server** folder

## Install and Run Mobile Application
- For details check the Readme under the **mobile** folder

## Sensor
- For details check the Readme under the **sensor** folder
