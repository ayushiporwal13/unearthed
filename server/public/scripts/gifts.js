const renderGifts = async () => {
  const response = await fetch("/gifts");
  const data = await response.json();

  const mainContent = document.getElementById("main-content");

  if (data) {
    data.map((gift) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const topContainer = document.createElement("div");
      topContainer.classList.add("top-container");

      const bottomContainer = document.createElement("div");
      bottomContainer.classList.add("bottom-container");

      topContainer.style.backgroundImage = `url(${gift.image})`;

      const name = document.createElement("h3");
      name.textContent = gift.name;
      bottomContainer.appendChild(name);

      const pricePoint = document.createElement("p");
      pricePoint.textContent = "Price: " + gift.pricePoint;
      bottomContainer.appendChild(pricePoint);

      const audience = document.createElement("p");
      audience.textContent = "Great For: " + gift.audience;
      bottomContainer.appendChild(audience);

      const link = document.createElement("a");
      link.textContent = "Read More >";
      link.setAttribute("role", "button");
      link.href = `/gifts/${gift.id}`;
      bottomContainer.appendChild(link);

      card.appendChild(topContainer);
      card.appendChild(bottomContainer);

      mainContent.appendChild(card);
    });
  } else {
    const message = document.createElement("h2");
    message.textContent = "No Gifts Available 😞";
    mainContent.appendChild(message);
  }
};


const requestedUrl = window.location.href.split('/').pop()


// if (requestedUrl) {
//   window.location.href = '../404.html'
// }
// else {
  renderGifts();
// }



const renderGift = async () => {
  const requestedID = parseInt(window.location.href.split('/').pop())
  const response = await fetch('/gifts');
  const data = await response.json();

  const giftContent = document.getElementById('gift-content');

  let gift;
  gift = data.find(gift => gift.id === requestedID)

  if (gift) {

    document.getElementById('image').src = gift.image
document.getElementById('name').textContent = gift.name
document.getElementById('submittedBy').textContent = 'Submitted by: ' + gift.submittedBy
document.getElementById('pricePoint').textContent = 'Price: ' + gift.pricePoint
document.getElementById('audience').textContent = 'Great For: ' + gift.audience
document.getElementById('description').textContent = gift.description
document.title = `UnEarthed - ${gift.name}`
      
  }
  else {
    const message = document.createElement('h2')
    message.textContent = 'No Gifts Available 😞'
    giftContent.appendChild(message)
  }
};

renderGift();
