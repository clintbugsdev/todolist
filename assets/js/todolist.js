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
                        var checked = value.done == 1 ? 'checked="checked"' : '';
                        todoListTableBody.append(
                                '<tr data-item-id="' + value.id + '">' +
                                '<td><div class="checkbox"><input ' + checked + ' name="done" value="yes" type="checkbox" class="checkbox-done"/></div></td>' +
                                '<td>' + value.item + '</td>' +
                                '<td><button type="button" class="btn btn-sm btn-info btn-edit-item">Edit</td>' +
                                '<td><button type="button" class="btn btn-sm btn-danger btn-remove-item">Remove</td>' +
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
                            '<tr data-item-id="' + newItem.id + '">' +
                            '<td><div class="checkbox"><input name="done" value="yes" type="checkbox" class="checkbox-done"/></div></td>' +
                            '<td>' + itemInput.val() + '</td>' +
                            '<td><button type="button" class="btn btn-sm btn-info btn-edit-item">Edit</td>' +
                            '<td><button type="button" class="btn btn-sm btn-danger btn-remove-item">Remove</td>' +
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
                } else {

                }
            }
        });
    });
});