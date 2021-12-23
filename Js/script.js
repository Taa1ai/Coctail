const API = 'https://www.thecocktaildb.com/api/json/v1/1/'
const All = 'filter.php?c=Cocktail'
let form, input, output;
output = document.getElementById('output')
out = document.getElementById('output2')
input = document.getElementById('input')
form = document.getElementById('form')
imgContent = document.getElementById('img')
let btn = document.createElement('button')
btn.innerHTML = 'Exit'
btn.className='Exit'

const getAllCocktails = async () => {
    const req = await fetch(API + All)
    const res = await req.json()
    output.innerHTML = ''
    renderAllCoctails(res.drinks)
    console.log(res)
}

const searchCoctailsByName = async () => {
    const req = await fetch(API + 'search.php?s=' + input.value)
    const res = await req.json()
    console.log(res);
    output.innerHTML = ''
    renderAllCoctails(res.drinks)
}

const searchById = async (id) => {
    const req = await fetch(API + 'lookup.php?i=' + id)
    const res = await req.json()
    output.innerHTML = ''
    console.log(res.drinks);
    renderById(res.drinks)
}
//TODO:ing это ингридиент
const renderById = (ing) => {
    let name = document.createElement('p')
    let img = document.createElement('img')
    let category = document.createElement('p')
    let alco = document.createElement('p')
    let ing1 = document.createElement('p')
    let ing2 = document.createElement('p')
    let ing3 = document.createElement('p')
    let ing4 = document.createElement('p')
    img.className = 'contentIMG'
    category.innerHTML = ing[0].strCategory
    alco.innerHTML = ing[0].strAlcoholic
    ing1.innerHTML = ing[0].strIngredient1
    ing2.innerHTML = ing[0].strIngredient2
    ing3.innerHTML = ing[0].strIngredient3
    ing4.innerHTML = ing[0].strIngredient4
    img.src = ing[0].strDrinkThumb
    let box = document.createElement('div')
    box.className = 'write'
    out.append(box,)
    imgContent.append(name)
    box.append(img, category, alco, ing1, ing2, ing3, ing4,btn)
    ing1.addEventListener('click', () => {
        searchIngredient(ing[0].strIngredient1)
    })
    ing2.addEventListener('click', () => {
        searchIngredient(ing[0].strIngredient2)
    })
    ing3.addEventListener('click', () => {
        searchIngredient(ing[0].strIngredient3)
    })
    ing4.addEventListener('click', () => {
        searchIngredient(ing[0].strIngredient4)
    })
}
const renderAllCoctails = (data) => {
    data.forEach(el => {
        let div = document.createElement('div')
        div.className = 'contants'
        let h4 = document.createElement('h4')
        let img = document.createElement('img')
        h4.className = 'strDrink'
        img.className = 'imgDrinks'
        h4.innerHTML = el.strDrink.length > 8 ? el.strDrink.slice(0, 8) + '...' : el.strDrink
        img.src = el.strDrinkThumb
        output.append(div)
        div.append(img, h4)
        div.addEventListener('click', () => {
            searchById(el.idDrink)
        })
    });
}
const searchIngredient = async (name) => {
    const req = await fetch(API + 'search.php?i=' + name)
    const res = await req.json()
    output.innerHTML = ''
    console.log(res.ingredients);
    renderIngridients(res.ingredients)
}
const renderIngridients = (detail) => {
    let ABV, alco, type, description
    ABV = document.createElement('p')
    alco = document.createElement('p')
    type = document.createElement('p')
    description = document.createElement('p')
    ABV.innerHTML = detail[0].strABV
    alco.innerHTML = detail[0].strAlcohol
    type.innerHTML = detail[0].strIngredient
    description.innerHTML = detail.strDescription === null ? 'no description ' : detail[0].strDescription
    let box = document.createElement('div')
    box.className = 'alltexts'
    output.append(box)
    box.append(ABV, alco, type, description)
}
btn.addEventListener('click', () => {
    getAllCocktails()
    out.innerHTML=''
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    searchCoctailsByName()
})
getAllCocktails()


