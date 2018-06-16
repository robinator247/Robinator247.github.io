

'use strict';

function fillImageSet (inputSubredditArray) {
    const LIMIT = 50;
    var i;
    var j;
    //Create array for urls to be added to
    var imageSet = [];
    for (i = 0; i < inputSubredditArray.length; i++){
        //Make sure that the value of i is saved at the time that it function is called
        (function (e) {
            //Fetch data from reddit
            reddit.hot(inputSubredditArray[e]).limit(LIMIT).fetch(function(res) {
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
            })
        }(i));
    }
}

var subredditArray = [];

if (window.location.pathname === "/c-happy-place/mixture.html"){
    subredditArray = ['aww', 'animalphotos', 'awww'];
} else if (window.location.pathname === "/c-happy-place/dogs.html"){
    subredditArray = ['dogpictures', 'lookatmydog', 'puppies'];
} else if (window.location.pathname === "/c-happy-place/alpacas.html"){
    subredditArray = ['alpaca', 'AlpacaSelfies'];
} else if (window.location.pathname === "/c-happy-place/elephants.html"){
    subredditArray = ['babyelephants'];
} else if (window.location.pathname === "/c-happy-place/hippos.html"){
    subredditArray = ['babyhippos'];
} else if (window.location.pathname === "/c-happy-place/meerkats.html"){
    subredditArray = ['Meerkats'];
}
fillImageSet(subredditArray);