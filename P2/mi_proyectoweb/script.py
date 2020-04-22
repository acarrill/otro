from mi_tienda.models import Album

albums = Album.objects.all()

for album in albums:
    arrayNames = album.name.split(" ")
    name = ""
    print(arrayNames)
    for word in arrayNames:
        if name == "":
            name = word
        else:
            name = name + '_' + word
        print(name)
    print(name)
    album.path = ("/products/" + "albums/" + name)
    album.save()
    print(album.path)
