$(function () {
    todolistTable = $('table#todolist-table');
    loadTodoList();

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
                                '<tr id="row-' + value.id + '">' +
                                '<td><div class="checkbox"><input ' + checked + ' name="done" value="yes" type="checkbox" class="checkbox-done"/></div></td>' +
                                '<td>' + value.item + '</td>' +
                                '<td><button class="btn btn-sm btn-info btn-edit">Edit</td>' +
                                '<td><button class="btn btn-sm btn-danger btn-remove">Remove</td>' +
                                '</tr>'
                                );
                    });
                } else {
                    todoListTableBody.html(data.message);
                }
            }
        });
    }
});