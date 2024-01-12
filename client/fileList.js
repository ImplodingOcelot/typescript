async function populateList() {
    let data = await getData();
    data = JSON.parse(data);
    let list = document.getElementById("list");
    for (i = 0; i < data.length; i++) {
        var li = document.createElement('li');
        //li.innerText = data[i];
        li.innerHTML = '<a href="/read?filename=' + data[i] + '">' + data[i] + '</a>';
        list.appendChild(li);
    }
}
async function getData() {
    const url = '/fileListData';
    output = await fetch(url).then((response) => response.text());
    return output;
}
populateList();