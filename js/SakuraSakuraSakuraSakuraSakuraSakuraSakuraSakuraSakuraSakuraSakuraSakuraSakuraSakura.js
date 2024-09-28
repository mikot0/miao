// 自定义文章内容数组
var articles = [
  {
    title: '<h1 id="logo">1</h1>',
    tags: ['time ', 'folder-', 'label'],
    content: '<h2 style="color: red;">1</h2>'
  },
  {
    title: '<h1 id="logo">2</h1>',
    tags: ['time ', 'folder-', 'label'],
    content: '<h2 style="color: red;">2</h2>'
  },
  {
    title: '<h1 id="logo">3</h1>',
    tags: ['time ', 'folder-', 'label'],
    content: '<h2 style="color: red;">3</h2>'
  }
];

// 获取搜索输入框和搜索结果容器的引用
var searchInput = document.querySelector('.search-input');
var searchResultsContainer = document.querySelector('.search-results');

// 监听搜索输入框的键盘事件
searchInput.addEventListener('input', function (event) {
  var searchTerm = event.target.value.toLowerCase();
  var matchedArticles = [];

  // 过滤匹配的文章
  matchedArticles = articles.filter(function (article) {
    return (
      article.title.toLowerCase().includes(searchTerm) ||
      article.tags.join(' ').toLowerCase().includes(searchTerm) ||
      article.content.toLowerCase().includes(searchTerm)
    );
  });

  // 清空搜索结果容器
  searchResultsContainer.innerHTML = '';

  if (matchedArticles.length > 0) {
    // 添加匹配的文章到搜索结果容器
    matchedArticles.forEach(function (article) {
      var resultElement = document.createElement('div');
      resultElement.classList.add('result');

      var titleElement = document.createElement('h3');
      titleElement.innerHTML = article.title;

      var tagsElement = document.createElement('div');
      tagsElement.classList.add('tags');
      tagsElement.innerHTML = article.tags.join(', ');

      var contentElement = document.createElement('div');
      contentElement.classList.add('content');
      contentElement.innerHTML = article.content;

      resultElement.appendChild(titleElement);
      resultElement.appendChild(tagsElement);
      resultElement.appendChild(contentElement);

      searchResultsContainer.appendChild(resultElement);
    });

    // 显示搜索结果容器
    searchResultsContainer.classList.add('visible');
  } else {
    // 没有匹配结果时，显示无结果提示
    var noResultsElement = document.createElement('div');
    noResultsElement.classList.add('no-results');
    noResultsElement.textContent = '';
    searchResultsContainer.appendChild(noResultsElement);

    // 显示搜索结果容器
    searchResultsContainer.classList.add('visible');
  }
});

// 点击页面其他区域隐藏搜索结果
document.addEventListener('click', function (event) {
  if (!searchResultsContainer.contains(event.target) && event.target !== searchInput) {
    searchResultsContainer.innerHTML = '';
    searchResultsContainer.classList.remove('visible');
  }
});

// 清空搜索框并隐藏搜索结果
searchInput.addEventListener('keyup', function (event) {
  if (event.key === 'Backspace' && searchInput.value === '') {
    searchResultsContainer.innerHTML = '';
    searchResultsContainer.classList.remove('visible');
  }
});