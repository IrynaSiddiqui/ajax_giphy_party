console.log("Let's get this party started!");

const $gifArea = $('#gif-area');
const $searchInput = $('#search');

/* use ajax to add a gif */

function addGif(res) {
    let numResults = res.data.length;
    console.log(res)
    if (numResults) {
        let randomIdx = Math.floor(Math.random() * numResults);
        let $newCol = $('<div>', {class: 'col-md-4 col-12 mb-4'});
        let $newGif = $('<img>', 
        {src: res.data[randomIdx].images.original.url,
        class: 'w-100'
        });
        $newCol.append($newGif);
        $gifArea.append($newCol);
    }
}

/* Handle form submission: clear search box & make ajax call */

$('form').on('submit', async function(evt) {
    evt.preventDefault();

    let searchTerm = $searchInput.val();
    $searchInput.val('');

    const response = await axios.get('http://api.giphy.com/v1/gifs/search', 
    {params: {
        q: searchTerm,
        api_key: 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym'
    }
    })
    addGif(response.data);
    console.log(response)
})

/* remove gif */

$('#remove').on('click', function() {
    $gifArea.empty()
})