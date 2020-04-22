function test() {
  let cookies = document.cookie;
  let cartMssg = document.getElementsByClassName("cart-mssg");
  let cartContent = document.createElement("P");
  let cartEmpty = true;

  cartContent.innerText = "Your current cart:" + '\n';
  cookies = cookies.split(';');

  for (cookie in cookies) {
    cookieName = cookies[cookie].split('=')[0];
    cookieValue = cookies[cookie].split('=')[1];
    if (cookieName.includes('product')) {
      cartEmpty = false;
      cartContent.innerText += cookieValue + '\n';
      cartMssg[0].appendChild(cartContent);
    }
  }
  if (cartEmpty) {
    console.log("dfjsdfhb");
    document.getElementsByClassName('error-mssg')[0].style.display = "block";
  }
}

function search(event) {
  let searchBar = document.getElementById("search-bar");
  let searchBox = document.getElementById("search-box");
  let results = document.getElementById("possible-text")
  const searchValue = searchBox.value;
  const KeyCode = Number(event.keyCode);

  if (KeyCode > 64 && KeyCode < 91 && searchValue.length >= 2) {
    let ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200) {
        // if exists old results we remove it
        if (document.getElementById("search-match") != null) {
          results.removeChild(document.getElementById("search-match"))
        }
        let response = JSON.parse(this.response);
        results.style = "display:block"
        let li = document.createElement("LI");
        li.setAttribute("id", "search-match")
        li.innerText = response;
        li.style = "color:white"
        results.appendChild(li);
      }
    };
    ajax.open("GET", "searching="+searchValue, true)
    ajax.send()
  }
}
