// const fetch = require('node-fetch');

let card = '';
fetch('https://api.github.com/repos/nodejs/node/issues')
  .then(function(response) {
    if (response.status !== 200) {
      console.log(
        `Looks like there was a problem. Status Code : ${response.stats}`
      );
      return;
    }

    // Examine the text in the response
    response.json().then(function(data) {
      for (let i = 0; i < data.length; i++) {
        const url = data[i].html_url;
        const avatar = data[i].user.avatar_url;
        const userUrl = data[i].user.html_url;
        const displayName = data[i].user.login;
        const issueId = data[i].number;
        const title = data[i].title;
        const createdAt = data[i].created_at;
        const date = moment(createdAt).format('llll');

        let label = '';
        for (let j = 0; j < data[i].labels.length; j++) {
          const labelName = data[i].labels[j].name;
          const labelColor = '#' + data[i].labels[j].color;
          let textColor =
            getBright(labelColor, mod) > 0.8 ? '#000000' : '#ffffff';

          label += `<a class="label" style="background: ${labelColor}; color: ${textColor};">${labelName}</a>`;
        }

        card +=
          `<li>` +
          ` <div class="card">` +
          `   <div class="card-content">` +
          `     <div class="media">` +
          `       <div class="media-left">` +
          `         <figure class="image is-48x48">` +
          `           <img id="user-icon" src="${avatar}" alt="Placeholder image"/>` +
          `         </figure>` +
          `       </div>` +
          `       <div class="media-content">` +
          `         <p id="user-name" class="title is-4"><a href="${userUrl}">${displayName}</a></p>` +
          `         <p class="subtitle is-6">#${issueId}</p>` +
          `       </div>` +
          `     </div>` +
          `     <div id="title" class="title is-4"><a href="${url}">${title}</a></div>` +
          `     <div class="content">` +
          // `       <a href="#">${tag1}</a> <a href="#">${tag1}</a>` +
          `       ${label}` +
          `       <br />` +
          `       <time>${date}</time>` +
          `     </div>` +
          `   </div>` +
          ` </div>` +
          `</li>`;
        // console.log(card);
      }
      $('.card-js').append(card);
    });
  })
  .catch(function(err) {
    console.log(`Fetch Error :-S`, err);
  });

const getBright = function(colorcode, mod) {
  if (colorcode.match(/^#/)) {
    colorcode = colorcode.slice(1);
  }

  var digit = Math.floor(colorcode.length / 3);

  if (digit < 1) return false;

  var rgb = [];
  for (var i = 0; i < 3; i++) {
    rgb.push(parseInt(colorcode.slice(digit * i, digit * (i + 1)), 16));
  }

  var rmod = mod.r || 1;
  var gmod = mod.g || 1;
  var bmod = mod.b || 1;

  var bright = Math.max(rgb[0] * rmod, rgb[1] * gmod, rgb[2] * bmod) / 255;

  return bright;
};
const mod = { r: 0.9, g: 0.8, b: 0.4 };
