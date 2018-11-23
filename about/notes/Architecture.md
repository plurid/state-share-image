<link rel="stylesheet" type="text/css" href="style.css">


From a base image and a state object obtain a new image.

The image is shared by the user to another user.



### Future

State with expiration date




ALGORITHM

The user sets the metadata domain image

    <meta property="state-share-image" content="./domain.png">

if no image is set, than the default one is used
(maybe loaded from a CDN?)
(maybe check for the string length and encode it into an appropriately-sized image)

     100 pixels ×  100 pixels × 4 color channels =     40.000 bits =   1.250 state string characters ≈  13.81 kB
     200 pixels ×  200 pixels × 4 color channels =    160.000 bits =   5.000 state string characters ≈  24.21 kB
     400 pixels ×  400 pixels × 4 color channels =    640.000 bits =  20.000 state string characters ≈  44.34 kB
     800 pixels ×  800 pixels × 4 color channels =  2.560.000 bits =  80.000 state string characters ≈  85.35 kB


The user encodes the stateObject using stateShareImage.encode(stateObject)
gets imageData and passes it as the `src` attribute of the state-share-image element.

If the state-share-image element has no `src` it uses a default one.
