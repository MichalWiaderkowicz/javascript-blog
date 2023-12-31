'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTagLink: Handlebars.compile(document.querySelector('#template-article-tag-link').innerHTML),
  articleAuthorLink: Handlebars.compile(document.querySelector('#template-article-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  allAuthorsLink: Handlebars.compile(document.querySelector('#template-all-authors-link').innerHTML)
};
/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });?*/
const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [DONE zadaj pytanie consol.log?] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* [DONE zadaj pytanie] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);
  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');  
};
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = 'p.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5 ,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.list.authors';


const generateTitleLinks = function(customSelector = ''){
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  for(let article of articles){  
  /* for each article */
  //const articles = document.querySelectorAll(optArticleSelector);
    //for (const article of articles){
    /* get the article id */
    const articleId = article.getAttribute('id');
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);
    /* [DONE innerHML;] get the title from the title element */
    /* create HTML of the link */
    //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log(linkHTML);
    const linkHTMLData = {id: articleId, title: articleTitle}; 
    const linkHTML = templates.articleLink(linkHTMLData);
    /*[!!!zapytaj o insertAdjacentHTML!!!] insert link into titleList */
    //titleList.innerHTML = titleList.innerHTML + linkHTML;
    /* insert link into html variable */
    html = html + linkHTML;
  } 
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  console.log(links);
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
};

generateTitleLinks();

const calculateTagClass = function(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return classNumber;
};

const calculateTagsParams = function(tags){
  const params = {max: 0, min: 999999};
  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
};

const generateTags = function(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);
    /* make html variable with empty string */
    //let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      /* generate HTML of the link */
      //const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li> ';
      //console.log(linkHTML);
      const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.articleLink(linkHTMLData);
      /* add generated code to html variable */
      tagsWrapper.insertAdjacentHTML('beforeend', linkHTML);
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]){
        /* [NEW] add generated code to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    //tagsWrapper.innerHTML = html;
    const tagLinks = document.querySelectorAll('tag');
    console.log(tagLinks);
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  /* [NEW] add html from allTags to tagList */
  //tagList.innerHTML = allTags.join(' ');
  //console.log(allTags);
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  /* [NEW] create variable for all links HTML code */
  //let allTagsHTML = '';
  const allTagsData = {tags: []};
  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
  /* 
  [NEW] generate code of a link and add it to allTagsHTML */
    //allTagsHTML += '<li><a  class="'+ optCloudClassPrefix + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '"><span>' + tag + '(' + allTags[tag] + ')</span></a></li>';
    //console.log(allTagsHTML);
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: optCloudClassPrefix + calculateTagClass(allTags[tag], tagsParams)
    }); 
  /* [NEW] END LOOP: for each tag in allTags: */
  }
  /*[NEW] add HTML from allTagsHTML to tagList */
  //tagList.innerHTML = allTagsHTML;
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log('allTagsData',allTagsData);
};
generateTags();
const tagClickHandler = function(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for(let tagLink of activeTagLinks){
    /* remove class active */
    tagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const targetTags = document.querySelectorAll('href');
  /* START LOOP: for each found tag link */
  for(let tag of targetTags){
    /* add class active */
    tag.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
};
const addClickListenersToTags = function(){
  /* find all links to tags */
  const linksOfTags = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for(let link of linksOfTags){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
};

addClickListenersToTags();



const generateAuthors = function(){
  /* [NEW] create a new variable allTags with an empty object */
  let allAuthors = {};
  console.log(allAuthors);
 
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find authors wrapper */
    const authorsWrapper = article.querySelector(optArticleAuthorSelector);
    console.log(authorsWrapper);
    /* make html variable with empty string */
    let html = '';
    /* get author from data-author attribute */
    const author = article.getAttribute('data-author');
    console.log(author);
    /* generate HTML of the link */
    //const linkHTML ='by '+'<a href="#author-' + author + '"><span>' + author + '</span></a>';
    //console.log(linkHTML);
    const linkHTMLData = {id: author, title:author};
    const linkHTML = templates.articleAuthorLink(linkHTMLData);
    /* add generated code to html variable */
    html = html + linkHTML;
    /* insert HTML of author into the tags wrapper */
    authorsWrapper.innerHTML = html;

    if(!allAuthors[author]){
      /* [NEW] add generated code to allTags object */
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
  /* END LOOP: for every article: */
  }
  const authorList = document.querySelector(optAuthorsListSelector);
  //authorList.innerHTML = '';
  //const tagsParams = calculateTagsParams(allAuthors);
  //console.log('tagsParams:', tagsParams);
  //let authorLinkHTML = '';
  const allAuthorsData = {
    authors: []
  };
  for(let author in allAuthors){
    //authorLinkHTML += '<li><a class="'+ optCloudClassPrefix + calculateTagClass(allAuthors[author], tagsParams) + '" href="#author-'+ author + '"><span>' + author + '('+allAuthors[author]+')</span></a></li>';
    //authorList.innerHTML = authorLinkHTML;
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
    });
    console.log('author',author);
    console.log('allAuthors[author]',allAuthors[author]);
  }
  authorList.innerHTML = templates.allAuthorsLink(allAuthorsData);
};
generateAuthors();

const authorClickHandler = function(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "author" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  console.log(author);
  /* find all author links with class active */
  const activeAuthorsLinks = document.querySelectorAll('a.active[href^="#author-"]');
  /* START LOOP: for each active author link */
  for(let authorLink of activeAuthorsLinks){
    /* remove class active */
    authorLink.classList.remove('active');
  /* END LOOP: for each active author link */
  }
  /* find all author links with "href" attribute equal to the "href" constant */
  const targetAuthor = document.querySelectorAll('href');
  /* START LOOP: for each found author link */
  for(let author of targetAuthor){
    /* add class active */
    author.classList.add('active');
  /* END LOOP: for each found author link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
};
const addClickListenersToAuthors = function(){
  /* find all links to author */
  const linksOfAuthors = document.querySelectorAll('a[href^="#author-"]');
  /* START LOOP: for each link */
  for(let link of linksOfAuthors){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */
  }
};
addClickListenersToAuthors();