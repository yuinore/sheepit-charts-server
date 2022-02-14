# sheepit-charts-server

## usage
```
git clone ...
cd sheepit-charts-server
yarn install
vim .env
```

```
LOGIN=your_name
PASSWORD=your_password
```

```
bash craw.sh # TEST
crontab -e
```

```
*/5 * * * * bash absolute_path/to/sheepit-charts-server/crawl.sh
```
