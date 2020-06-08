//nao esquecer de melhorar o allusers. ele deve receber todo o array, nao so o que foi mapeado.
let allUsers = [];

window.addEventListener('load', () => {
    const searchBar = document.querySelector('#search-bar');
    searchBar.addEventListener('keyup', handleSearchInput);
    const resultsTab = document.querySelector('#results-tab');
    const dataTab = document.querySelector('#data-tab');
    const resultsQuantity = document.querySelector('#results-quantity');
    const searchResults = document.querySelector('#search-results');
    const searchButton = document.querySelector('#search-button');
    searchButton.addEventListener('click', handleSearchButton);

    fetchingUsers();
});

async function fetchingUsers() {
    const res = await fetch(
        'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
    );
    console.log(res);
    const json = await res.json();
    allUsers = json.results.map((user) => {
        const {
            name: { first, last },
            picture: { thumbnail },
            dob: { age },
            gender,
        } = user;
        return {
            firstName: first,
            lastName: last,
            image: thumbnail,
            age,
            gender,
        };
    });
    render();
}

function render() {}

function handleSearchInput(event) {
    const searchValue = event.target.value;
}

if (searchName.includes(searchValue) === true) {
    console.log('Funciona');
} else {
    console.log('ferrou');
}
