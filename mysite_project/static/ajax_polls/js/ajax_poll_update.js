function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]);
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function csrfSafeMethod(method) {
  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
  beforeSend: function(xhr, settings) {
    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
      xhr.setRequestHeader("X-CSRFToken", csrftoken);   
    }
  }
});

listenerAdd = function (element) {
  element.addEventListener('click', function () {
    if (loadedSet.has(element)) {
      removeChildren(element);
      loadedSet.delete(element);
      return;
    }
    else {
      addChidren(element);
    }
  })
}

setAttributes = function (element, attrs) {
  for (var key in attrs) {
    element.setAttribute(key, attrs[key]);
  }
}

removeChildren = function (element) {
  var choiceElems = element.parentElement.getElementsByClassName('choice-options');
  while (choiceElems.length) {
    choiceElems[0].remove();
  }
}

addChild = function (element, response) {
  var newList = document.createElement('ul');
  var newListAttrs = {'class': 'list-group',
    'question_pk': element.getAttribute('question_pk'),
  }
  setAttributes(newList, newListAttrs);
  element.appendChild(newList);
  for (var key in response) {
    if (response.hasOwnProperty(key)) {
      addChoiceItem(newList, response, key);
    }
  }
}

addChoiceItem = function (element, response, key) {
  var newListItem = document.createElement("li");
  newListItemAttrs = {'id': response[key]['choice_pk'],
    'class': 'choice-item list-group-item',
    'text': response[key]['choice_text'],
    'question_pk': element.getAttribute('question_pk'),
  }
  setAttributes(newListItem, newListItemAttrs);
  element.appendChild(newListItem);
  newListItem.addEventListener('click', function (){
    postChoice(newListItem);
  });
  var newListTag = document.createElement("label");
  newListTag.textContent = response[key]['choice_text'];
  newListItem.appendChild(newListTag);
}

addBadge = function (element, response) {
  var badge = document.createElement('span');
  badgeAttrs = {'class': 'badge badge-info', }
  badge.textContent = response['count'];
  setAttributes(badge, badgeAttrs);
  previous_badges = element.getElementsByTagName('span')
  while (previous_badges.length) {
    previous_badges[0].remove();
  }
  element.appendChild(badge);
}

addChidren = function (element) {
  var parent = element.parentElement;
  var textSibling = parent.getElementsByClassName("ajax-polls-item")[0];
  $.ajax({
    url: ajax_function_url,
    method: 'GET',
    data: {'question_pk': element['name'], 'function': 'pull_choices', },
    success: function(response) {
      var choiceElement = document.createElement('div');
      var choiceElementAttrs = {'question_pk': textSibling['name'], 'class': 'choice-options', };
      setAttributes(choiceElement, choiceElementAttrs);
      parent.appendChild(choiceElement);
      addChild(choiceElement, response);
      loadedSet.add(element);
      return true;
    }
  })
}

postChoice = function (element) {
  $.ajax({
    url: ajax_function_url,
    method: 'POST',
    data: {'choice_pk': element['id'], 'question_pk': element.getAttribute('question_pk'), },
    csrfmiddlewaretoken: '{{ csrf_token }}',
    success: function (response) {
      addBadge(element.getElementsByTagName('label')[0], response);
    }
  })
}

var ajax_function_url = "{% url 'ajax_polls:ajax_polls' %}";
var pollsItemList = document.getElementsByClassName("ajax-polls-item");
var loadedSet = new Set();

var csrftoken = getCookie('csrftoken');
var ajax_function_holder = document.querySelectorAll('[ajax-function-url]');
var ajax_function_url = ajax_function_holder[0].getAttribute('ajax-function-url')

for (i = 0; i < pollsItemList.length; i++) {
  listenerAdd(pollsItemList[i]);
}