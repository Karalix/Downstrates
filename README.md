# DownStrates

Collaborative editing using markdown.

## How to use

First the dependencies should be installed. Make sure *npm* is installed.


```console
npm --prefix ./server install
npm --prefix ./client install
npm --prefix ./client run build
npm --prefix ./server start
```

The console should show that the server is listening on port 8080. Make sure the mongodb server you want to connect to is up and running !

```console
Listening on http://localhost:8080
```

You can now open multiple tabs on *localhost:8080*

You can create new documents by adding their name to the url (eg: http://localhost:8080/edit/newdoc)

You can also access the reading mode using the url http://localhost:8080/read/newdoc

