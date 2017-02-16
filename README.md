# DownStrates

Collaborative editing using markdown.

## How to use

Make sure to have a recent version of Node.js and MongoDB installed.


```console
npm --prefix ./server install
npm --prefix ./client install
npm --prefix ./client run build
npm --prefix ./server start
```

Make sure the mongodb server you want to connect to is up and running and the following should appear :

```console
Listening on http://localhost:8080
```

You can now open multiple tabs on *localhost:8080*

You can create new documents by adding their name to the url (eg: [http://localhost:8080/edit/newdoc](http://localhost:8080/edit/newdoc))

You can also access the reading mode using the url [http://localhost:8080/read/newdoc](http://localhost:8080/read/newdoc)

