$(function() {
  var inputboxli = '<li class="input-box">' +
      '<ul class="input-box-heading item-head-tools list-unstyled">' +
      '<li id="mover-tool" class="item-tool"><span class="glyphicon glyphicon-move"></span></li>' +
      '<li id="type-tool" class="item-tool" data-type="script">' +
      '<div class="dropdown">' +
      '<div class="dropdown-toggle" type="button" data-toggle="dropdown"><span class="item-type">script</span>' +
      '<span class="caret"></span>' +
      '</div>' +
      '<ul class="dropdown-menu">' +
      '<li><a href="#" data-value="script" class="type-select">Script</a></li>' +
      '<li><a href="#" data-value="html" class="type-select">HTML</a></li>' +
      '<li><a href="#" data-value="h1" class="type-select">Heading 1</a></li>' +
      '</ul>' +
      '</div>' +
      '</li>' +
      '<li id="type-tool" class="item-tool">' +
      '<div class="dropdown">' +
      '<div class="dropdown-toggle" type="button" data-toggle="dropdown"><span class="glyphicon glyphicon-option-vertical"></span>' +
      '</div>' +
      '<ul class="dropdown-menu">' +
      '<li><a href="#">Delete</a></li>' +
      '</ul>' +
      '</div>' +
      '</li>' +
      '</ul>' +
      '<div class="input-box-editor">' +
      '<textarea class="text-editor" rows=1></textarea>' +
      '</div>' +
      '</li>';

  function add_input_box() {
    $('#draggablePanelList').append(inputboxli);

	$('.text-editor').on('keydown', function(e){
		if(e.keyCode == 9){
            var val = this.value,
			start = this.selectionStart,
			end = this.selectionEnd;

            // set textarea value to: text before caret + tab + text after caret
            this.value = val.substring(0, start) + '\t' + val.substring(end);

            // put caret at right position again
            this.selectionStart = this.selectionEnd = start + 1;

            // prevent the focus lose
            return false;
		}
	});

    $('.text-editor').keydown(function (e) {
		if(e.ctrlKey == 13){

		}

		if (e.ctrlKey && e.keyCode == 13) {

		}
    });

    $(".type-select").click(function() {
      selected = $(this).attr("data-value");
      $(this).closest("li.item-tool").find(".item-type").html(selected);
      //alert($(this).attr("data-value"));
    });    
  }
  $("#add_console_btn").click(function() {
    add_input_box();
  autosize(document.querySelectorAll('textarea'));
  });

  $('#query_btn').click(function() {
    setListData();
    console.log(listData);
    $('#result').html("");
    $.each(listData, function(i, d) {
      $('#result').append("<p>("+d.type+") => ("+d.source+")</p>");
    });
  });

  var listData = [];
  setListData = function() {
    listData = [];
    panelList.find(".input-box").each(function(index) {
      editor = $(this).find(".text-editor");
      type = $(this).find(".item-type");
      listData.push({
        "type": type.text(),
        "source": editor.val()
      });
	  $('#json_value').html(JSON.stringify(listData));
    });
  }

  function getTime()
  {
    return new Date().getTime();
  }

  addItemMore = function(selector) {
    itemid = getTime();
    var itemadd = "<div class='jc-item'>" +
        "<div class='row'>" +
        "</div>" +
        "</div>";

    selector.append(itemadd).find('.jc-item-check').blur(function() {
      addBlurEvent($(this));				
    });

  }

  var $sectionListItem;
  var $itemListItem;

  var panelList = $('#draggablePanelList');

  try {
    panelList.sortable({
      // Only make the .panel-heading child elements support dragging.
      // Omit this to make then entire <li>...</li> draggable.
      handle: '.input-box-heading', 
      update: function() {
        $('.input-box', panelList).each(function(index, elem) {
          var $sectionListItem = $(elem),
              newIndex = $sectionListItem.index();

          // Persist the new indices.
        });
        //setListData();
        //console.log(setListData());
      }
    });
  } catch(err) {
    console.log(err);
  }
  //autosize('.text-editor');
});