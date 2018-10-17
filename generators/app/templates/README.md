# Redux-Observable-Start-Kit

> rx , redux 結合recompose 的基礎結構，

## 資料夾結構

```
.
├── app.js
├── index.js
├── page
│   └── home
│       ├── components
│       │   └── home.js
│       ├── containers
│       │   └── home.js
│       └── store
│           ├── action.js
│           ├── actionType.js
│           ├── epic.js
│           └── reducer.js
├── registerServiceWorker.js
├── routes
│   └── index.js
└── store
    ├── configureStore.js
    ├── epic.js
    └── reducer.js

7 directories, 14 files
```

### page
page已頁面為組件，page分割成 components,containers,store

- #### components
  視圖(View)，page的組成組件(components)，只接收props
- #### containers
  容器(Container)，處理component所需用到的商業邏輯，所有運算都在container 處理，componenet 只接收props
- ### store
  Store，管理redux、redux-Observable的action、reducer、epic

### routes
路由控制器，route的components 都是從page的containers render

### store
