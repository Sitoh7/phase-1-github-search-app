let form = document.getElementById("github-form")
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    let name = e.target.search.value
    console.log(name)

    fetch(`https://api.github.com/search/users?q=${name}`)
    .then(resp=>resp.json())
    .then(data=>{
        let userList = document.getElementById("user-list")
        let repoList = document.getElementById("repos-list")
        userList.textContent = ""
        for(i=0;i<data.items.length;i++){
            let li = document.createElement("li")
            li.textContent = data.items[i].login
            userList.appendChild(li)
            li.addEventListener("click",()=>{
                li.style.color = "blue"
                console.log(li.textContent)
                fetch(`https://api.github.com/users/${li.textContent}/repos`)
                .then(resp=>resp.json())
                 .then(data=>{
                    for(i=0;i<data.length;i++){
                        let name = document.createElement("li")
                        let link = document.createElement("p")
                        name.textContent = data[i].name
                        link.textContent = data[i].html_url
                        repoList.appendChild(name)
                        name.appendChild(link)
                    }

    })
            })
        }

    })
})