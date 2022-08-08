# <img alt="flow_nodes" src="src/img/logo/logo.png" width="160" />

Based on  
https://github.com/peilingjiang/b5

### Setup

```
git clone --recurse-submodules https://github.com/Oyalmli/flow_nodes.git
cd flow_nodes
npm run setup
```

To start developing, please open **two** terminal windows both looking at the root of this project folder and run the following two commands in each of them:

```shell
npm run css # if you want to modify CSS
```

```shell
npm start
```

The first one helps listen to changes of CSS files and optimize them, and the second one starts the development React build that will listen to any changes you make to lively reflect them in your page. It should automatically open a page from your default browser, but you can always go to `localhost:3000` as it's running.
