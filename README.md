# DownStrates

Collaborative editor using markdown.

## How to use

First the dependencies should be installed. Make sure *npm* is installed.

Go to the *server* folder and type

```console
npm install
```

Go to the *client* folder and type

```console
npm install
npm run build
```

After the dependencies installation, the server can be launched:
While in the *server* folder type:

```console
npm start
```

The console should show that the server is listening on port 8080. Make sure the mongodb server you want to connect to is up and running !

```console
Listening on http://localhost:8080
```

You can now open multiple tabs on *localhost:8080*

You can create new documents by adding their name to the url (eg: http://localhost:8080/edit/newdoc)

You can also access the reading mode using the url http://localhost:8080/read/newdoc

