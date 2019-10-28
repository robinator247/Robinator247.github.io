

'use strict';

function fillImageSet (inputSubredditArray) {
    const LIMIT = 50;
    var i;
    var j;
    //Create array for urls to be added to
    var imageSet = [];
    for (i = 0; i < inputSubredditArray.length; i++){
        //anonymous function
        (function (e) {
            //Fetch data from reddit
            if (reddit.hot(inputSubredditArray[e]).limit(LIMIT).fetch()) {
                for (j=0; j<LIMIT - 1; j++){
                    //Check that it is a link post
                    if (!(res.data.children[j].data.url === undefined)){
                        imageSet.push(res.data.children[j].data.url);
                    }
                }
                //If all subreddits have been added to the array loops through array and select the images that should be displayed
                if (e === inputSubredditArray.length - 1){
                    for (i=0; i<=11; i++){
                        var element = document.getElementById('image' + (i+1));
                        var flag = true;
                        while (flag){
                            var number = Math.floor(Math.random() * imageSet.length - 1) + 1;
                            var url = imageSet[number];
                            //Make sure it in an image link
                            if (url.substr(url.length - 3) === "jpg" || url.substr(0, 7) === "i.reddit" || url.substr(0,7) === "i.pinimg") {
                                element.src = url;
                                flag = false
                            }
                            //remove the link from the array
                            imageSet.splice(number, 1);
                        }
                    }
                }
            }
            else {
                window.alert("ljnfljdsgfnjldsfnjdsflnsdlkfnsdlnflnkdsfnlksdflknsdfnlksdlknfslkdnflkndsflkn")
            }
        }(i));
    }
}

var subredditArray = [];
var mainArray = ['aww', 'animalphotos', 'awww', 'dogpictures', 'lookatmydog', 'puppies', 'alpaca', 'AlpacaSelfies', 'babyelephants', 'babyhippos', 'Meerkats'];

switch (window.location.pathname) {
    case "/happy_place/mixture.html":
        subredditArray = ['aww', 'animalphotos', 'awww'];
        break;
    case "/happy_place/dogs.html":
        subredditArray = ['dogpictures', 'lookatmydog', 'puppies'];
        break;
    case "/happy_place/alpacas.html":
        subredditArray = ['alpaca', 'AlpacaSelfies'];
        break;
    case "/happy_place/elephants.html":
        subredditArray = ['babyelephants'];
        break;
    case "/happy_place/hippos.html":
        subredditArray = ['babyhippos'];
        break;
    case "/happy_place/meerkats.html":
        subredditArray = ['Meerkats'];
        break;
    case "/happy_place/random.html":
        var randNum = Math.floor(Math.random() * mainArray.length - 1) + 1;
        subredditArray[0] = mainArray[randNum];
        break;
    // case "/happy_place/custom.html":
    case "/home/robbie/Documents/work/rthandi.github.io/happy_place/custom.html":
        subredditArray = [customReddit()];
        break;
    default:
        subredditArray = subredditArray = ['aww', 'animalphotos', 'awww'];
        break;
}

function customReddit () {
    var chosenSubreddit = prompt("Choose the subreddit you would like to view");
    // TODO: add validation here
    return chosenSubreddit;
}

fillImageSet(subredditArray);
