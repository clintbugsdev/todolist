$(function () {
    todolistTable = $('table#todolist-table');
    loadTodoList();
    /*
     * 
     * @returns {array of todolist}
     */
    function loadTodoList() {
        var todoListTableBody = todolistTable.find('tbody');
        $.ajax({
            url: 'api/v1/todolist',
            type: 'GET',
            dataType: 'json',
            beforeSend: function () {
                todoListTableBody.html('Loading');
            },
            success: function (result) {
                todoListTableBody.empty();
                if (result.status == 'Success') {
                    $.each(result.data, function (key, value) {
                        var bgBlue = value.done == 1 ? 'bg-blue' : '';
                        var checked = value.done == 1 ? 'checked="checked"' : '';
                        todoListTableBody.append(
                                '<tr data-item-id="' + value.id + '" class="' + bgBlue + '">' +
                                '<td><div class="checkbox"><input ' + checked + ' name="done" value="yes" type="checkbox" class="checkbox-done"/></div></td>' +
                                '<td class="td-item">' +
                                '<div class="div-item-display">' + value.item + '</div>' +
                                '<div class="div-item-input form-group hidden">' +
                                '<input name="item" type="text" class="input-group" value="' + value.item + '" placeholder="">' +
                                '</div>' +
                                '</td>' +
                                '<td class="td-edit">' +
                                '<button type="button" class="btn btn-sm btn-info btn-edit-item">Edit</button>' +
                                '<button type="button" class="btn btn-sm btn-success btn-save-edit-item hidden">Save</button>' +
                                '</td>' +
                                '<td class="td-remove">' +
                                '<button type="button" class="btn btn-sm btn-danger btn-remove-item">Remove</button>' +
                                '<button type="button" class="btn btn-sm btn-warning btn-cancel-edit-item hidden">Cancel</button>' +
                                '</td>' +
                                '</tr>'
                                );
                    });
                } else {
                    todoListTableBody.html(data.message);
                }
            }
        });
    }
    /*
     * Add New Item
     */
    $('button#btn-add-item').on('click', function (e) {
        e.preventDefault();
        var addItemBtn = $(this);
        var itemInput = addItemBtn.closest('tr').find('th#th-item-input :input[name="new_item"]');
        var todoListTableBody = todolistTable.find('tbody');
        $.ajax({
            url: 'api/v1/todolist',
            type: 'POST',
            data: {'item': itemInput.val()},
            dataType: 'json',
            beforeSend: function () {
                addItemBtn.text('Loading');
            },
            success: function (result) {
                if (result.status == 'Success') {
                    var newItem = result.data;
                    todoListTableBody.append(
                            '<tr data-item-id="' + newItem.id + '" class="">' +
                            '<td><div class="checkbox"><input name="done" value="yes" type="checkbox" class="checkbox-done"/></div></td>' +
                            '<td class="td-item">' +
                            '<div class="div-item-display">' + itemInput.val() + '</div>' +
                            '<div class="div-item-input form-group hidden">' +
                            '<input name="item" type="text" class="input-group" value="' + itemInput.val() + '" placeholder="">' +
                            '</div>' +
                            '</td>' +
                            '<td class="td-edit">' +
                            '<button type="button" class="btn btn-sm btn-info btn-edit-item">Edit</button>' +
                            '<button type="button" class="btn btn-sm btn-success btn-save-edit-item hidden">Save</button>' +
                            '</td>' +
                            '<td class="td-remove">' +
                            '<button type="button" class="btn btn-sm btn-danger btn-remove-item">Remove</button>' +
                            '<button type="button" class="btn btn-sm btn-warning btn-cancel-edit-item hidden">Cancel</button>' +
                            '</td>' +
                            '</tr>'
                            );
                    itemInput.attr('placeholder', 'Add new item here').val('');
                } else {
                    itemInput.attr('placeholder', result.message);
                }
                addItemBtn.text('Add');
            }
        });
    });
    /*
     * Show Edit Item
     */
    $(document).on('click', 'button.btn-edit-item', function (e) {
        e.preventDefault();
        var showEditItemBtn = $(this);
        var itemContent = showEditItemBtn.closest('tr');
        itemContent.find('td.td-item div.div-item-display').addClass('hidden');
        itemContent.find('td.td-item div.div-item-input').removeClass('hidden');
        itemContent.find('td.td-edit button.btn-edit-item').addClass('hidden');
        itemContent.find('td.td-edit button.btn-save-edit-item').removeClass('hidden');
        itemContent.find('td.td-remove button.btn-remove-item').addClass('hidden');
        itemContent.find('td.td-remove button.btn-cancel-edit-item').removeClass('hidden');
    });
    /*
     * Cancel Edit Item
     */
    $(document).on('click', 'button.btn-cancel-edit-item', function (e) {
        e.preventDefault();
        var showEditItemBtn = $(this);
        var itemContent = showEditItemBtn.closest('tr');
        itemContent.find('td.td-item div.div-item-display').removeClass('hidden');
        itemContent.find('td.td-item div.div-item-input').addClass('hidden');
        itemContent.find('td.td-edit button.btn-edit-item').removeClass('hidden');
        itemContent.find('td.td-edit button.btn-save-edit-item').addClass('hidden');
        itemContent.find('td.td-remove button.btn-remove-item').removeClass('hidden');
        itemContent.find('td.td-remove button.btn-cancel-edit-item').addClass('hidden');
    });
    /*
     * Save Edit Item
     */
    $(document).on('click', 'button.btn-save-edit-item', function (e) {
        e.preventDefault();
        var saveEditItemBtn = $(this);
        var itemContent = saveEditItemBtn.closest('tr');
        var itemId = itemContent.attr('data-item-id');
        var itemInput = itemContent.find('td.td-item :input[name="item"]');
        $.ajax({
            url: 'api/v1/todolist/' + itemId + '?item=' + itemInput.val(),
            type: 'PATCH',
            dataType: 'json',
            beforeSend: function () {
                saveEditItemBtn.text('Loading');
            },
            success: function (result) {
                if (result.status == 'Success') {
                    itemContent.find('td.td-item div.div-item-display').removeClass('hidden').text(itemInput.val());
                    itemContent.find('td.td-item div.div-item-input').addClass('hidden');
                    itemContent.find('td.td-edit button.btn-edit-item').removeClass('hidden');
                    itemContent.find('td.td-edit button.btn-save-edit-item').addClass('hidden');
                    itemContent.find('td.td-remove button.btn-remove-item').removeClass('hidden');
                    itemContent.find('td.td-remove button.btn-cancel-edit-item').addClass('hidden');
                } else {
                    itemInput.attr('placeholder', result.message);
                }
                saveEditItemBtn.text('Save');
            }
        });
    });
    /*
     * Remove Item
     */
    $(document).on('click', 'button.btn-remove-item', function (e) {
        e.preventDefault();
        var removeItemBtn = $(this);
        var itemContent = removeItemBtn.closest('tr');
        var itemId = itemContent.attr('data-item-id');
        $.ajax({
            url: 'api/v1/todolist/' + itemId,
            type: 'DELETE',
            dataType: 'json',
            beforeSend: function () {
                removeItemBtn.text('Loading');
            },
            success: function (result) {
                if (result.status == 'Success') {
                    itemContent.remove();
                }
                removeItemBtn.text('Remove');
            }
        });
    });
    /*
     * Check/Uncheck Item
     */
    $(document).on('change', ':input[name="done"]', function (e) {
        e.preventDefault();
        var checkDoneItem = $(this);
        var itemContent = checkDoneItem.closest('tr');
        var itemId = itemContent.attr('data-item-id');
        $.ajax({
            url: 'api/v1/todolist/' + itemId + '/done',
            type: 'POST',
            data: {'done': checkDoneItem.is(":checked") ? 'yes' : 'no'},
            dataType: 'json',
            beforeSend: function () {

            },
            success: function (result) {
                if (result.status == 'Success') {
                    if (checkDoneItem.is(":checked")) {
                        itemContent.addClass('bg-blue');
                    } else {
                        itemContent.removeClass('bg-blue');
                    }
                }
            }
        });
    });
});