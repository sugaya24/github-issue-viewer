const fetchRepositories = () => {
  let str = $('#search-input').val();
  if (str === '') return;
  console.log(str);
  axios
    .get(
      `https://api.github.com/search/repositories?q=${str}&sort=stars&order=desc`
    )
    .then((response) => {
      $('#repo-list')
        .children()
        .remove();
      const $repos = response.data.items;
      // const $repo = response.data.items[0].name;
      console.log(`GET list repos: `, $repos);
      $repos.forEach((elm) => {
        // console.log(`repo stars: `, elm.stargazers_count);
        const repoName = elm.full_name;
        const issues_html = 'issues.html?' + repoName;
        const description = elm.description;
        const stargazers_count = elm.stargazers_count;
        const language = elm.language;
        const updated_at = moment(elm.updated_at)
          .startOf('hour')
          .fromNow();
        let card = '';
        card +=
          `<li>` +
          ` <div class="card">` +
          `   <header class="card-header">` +
          `     <div class="card-header-title title is-4">` +
          `       <a href="${issues_html}">${repoName}</a>` +
          `     </div>` +
          `   </header>` +
          `   <div class="card-content">` +
          `     <div class="content">` +
          `       <p>` +
          `         ${description}` +
          `       </p>` +
          `       <span>★${stargazers_count}</span>` +
          `       <span>${language}</span>` +
          `       <span>${updated_at}</span>` +
          `     </div>` +
          `   </div>` +
          ` </div>` +
          `</li>`;
        $('#repo-list').append(card);
      });
    })
    .catch((error) => console.error(error));
};

// fetchRepositories();

const delay = (callback, ms) => {
  var timer = 0;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      callback.apply(context, args);
    }, ms || 0);
  };
};
$('#search-input').keyup(delay(fetchRepositories, 500));
