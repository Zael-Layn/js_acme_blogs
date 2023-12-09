function createElemWithText(elemName = 'p', textContent = '', className = '') {
    const element = document.createElement(elemName);
    element.textContent = textContent;
    if (className) {
        element.className = className;
    }
    return element;
}

function createSelectOptions(users) {
    if (!users) {
      return undefined;
    }

    let options = [];

    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      let option = document.createElement("option");
      option.value = user.id;
      option.textContent = user.name;
      options.push(option);
    }

    return options;
  }

  function toggleCommentSection(postId) {

    if (!postId) {
        return undefined;
    }
    let section = document.querySelector(`section[data-post-id="${postId}"]`);
  
    
    if (section) {      
      section.classList.toggle('hide');
    }
  
    
    return section;
  }
  
  
  let sectionElement = document.createElement('section');
  sectionElement.setAttribute('data-post-id', '123');
  document.body.appendChild(sectionElement);

  function toggleCommentButton(postId) {
    if (!postId) {
      return undefined;
    }
    let button = document.querySelector("[data-post-id='" + postId + "']");
    if (!button) {
      return null;
    }
    button.textContent = (button.textContent === 'Show Comments') ? 'Hide Comments' : 'Show Comments';
    return button;
  }

  function deleteChildElements(parentElement) {
    if (!(parentElement instanceof HTMLElement)) {
      return undefined;
    }
  
    let child = parentElement.lastElementChild;
    while (child) {
      parentElement.removeChild(child);
      child = parentElement.lastElementChild;
    }
    return parentElement;
  }

  function toggleComments(event, postId) {
    if (!event || !postId) {
      return undefined;
    }
    event.target.listener = true;
    const section = toggleCommentSection(postId);
    const button = toggleCommentButton(postId);
    return [section, button];
  }
  
  function addButtonListeners() {
    const buttons = document.querySelectorAll("main button");
    if (buttons.length > 0) {
      buttons.forEach((button) => {
        const postId = button.dataset.postId;
        if (postId) {
          button.addEventListener("click", function () {
            toggleComments(event, postId);
          });
        }
      });
    }
    return buttons;
  }

  function removeButtonListeners() {
    const buttons = document.querySelectorAll('main button');
  
    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      const postId = button.dataset.id;
  
      if (postId) {
        button.removeEventListener('click', addButtonListeners);
      }
    }
  
    return buttons;
  }

  function createElemWithText(elemType, text, className) {
    const elem = document.createElement(elemType || 'p');
    elem.textContent = text;
    if (className) {
      elem.classList.add(className);
    }
    return elem;
  }

function createComments(comments) {
    if (!comments) return undefined;

    const fragment = document.createDocumentFragment();

    for (const comment of comments) {
        const article = document.createElement('article');

        const name = createElemWithText('h3', comment.name);
        article.appendChild(name);

        const body = createElemWithText('p', comment.body);
        article.appendChild(body);

        const email = createElemWithText('p', `From: ${comment.email}`);
        article.appendChild(email);

        fragment.appendChild(article);
    }

    return fragment;
}

function populateSelectMenu(data) {
    if (!data || typeof data !== "object") {
      return undefined;
    }
  
    let selectMenu = document.getElementById("selectMenu");
    let options = createSelectOptions(data);
  
    for (let i = 0; i < options.length; i++) {
      selectMenu.appendChild(options[i]);
    }
  
    return selectMenu;
  }

  const getUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const getUserPosts = async (userId) => {
    if (!userId) {
        return undefined;
      }
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const getUser = async (userId) => {
        if (!userId) {
        return undefined;
      }
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const getPostComments = async (postId) => {
    if (!postId) {
        return undefined;
      }
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const displayComments = async (postId) => {
    if (!postId) {
        return undefined;
      }
    const section = document.createElement('section');
    section.dataset.postId = postId;
    section.classList.add('comments', 'hide');
  
    try {
      const comments = await getPostComments(postId);
      const fragment = createComments(comments);
  
      section.appendChild(fragment);
  
      return section;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  
  const createPosts = async (postsData) => {
    if (!postsData) {
      return undefined;
    }
  
    const fragment = document.createDocumentFragment();
  
    for (const post of postsData) {
      const article = document.createElement("article");
  
      const title = document.createElement("h2");
      title.textContent = post.title;
      article.appendChild(title);
  
      const body = document.createElement("p");
      body.textContent = post.body;
      article.appendChild(body);
  
      const postId = document.createElement("p");
      postId.textContent = "Post ID: " + post.id;
      article.appendChild(postId);
  
      const author = await getUser(post.userId);
      const authorInfo = document.createElement("p");
      authorInfo.textContent = "Author: " + author.name + " with " + author.company.name;
      article.appendChild(authorInfo);
  
      const catchPhrase = document.createElement("p");
      catchPhrase.textContent = author.company.catchPhrase;
      article.appendChild(catchPhrase);
  
      const button = document.createElement("button");
      button.textContent = "Show Comments";
      button.dataset.postId = post.id;
      article.appendChild(button);
  
      const section = await displayComments(post.id);

      article.appendChild(section);
  
      fragment.appendChild(article);
    }
  
    return fragment;
  };
  
  const displayPosts = async (posts) => {
    try {

      const element = posts ? await createPosts(posts) : createDefaultParagraph();
      const mainElement = document.querySelector('main');
  
      mainElement.appendChild(element);
  
      return element;
    } catch (error) {

      console.error('An error occurred:', error);
    }
  };
  
  const createDefaultParagraph = () => {
    const paragraph = document.createElement('p');
    paragraph.textContent = 'Select an Employee to display their posts.';
    paragraph.classList.add('default-text');
    return paragraph;
  };

  async function refreshPosts(postsData) {
    if (!postsData) {
      return undefined;
    } 
    const removeButtons = await removeButtonListeners();
    const main = document.querySelector('main');
    const mainResult = deleteChildElements(main);
    const fragment = await displayPosts(postsData);
    const addButtons = await addButtonListeners();
  
    return [removeButtons, mainResult, fragment, addButtons];
  }

  async function selectMenuChangeEventHandler(event) {
    try {
      if (!event) {
        return undefined;
      }
      
      const selectMenu = event.target;
      selectMenu.disabled = true;
      const userId = selectMenu.value || 1; 
      const posts = await getUserPosts(userId);
      const refreshPostsArray = await refreshPosts(posts);
      selectMenu.disabled = false;
     
      return [userId, posts, refreshPostsArray];
    
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async function initPage() {
    const users = await getUsers();
    const select = populateSelectMenu(users);
    return [users, select];
  }
  
  const initApp = () => {
  
    initPage();
  

    const selectMenu = document.querySelector('#selectMenu');
  
    // Add an event listener to the #selectMenu for the "change" event
    selectMenu.addEventListener('change', selectMenuChangeEventHandler);
  }
  
  initApp();
