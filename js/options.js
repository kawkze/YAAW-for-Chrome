$(function(){
    var config =(function(){
        return {
            init:function(){
                var self =this;
                var contextMenus=localStorage.getItem("contextMenus");
                if(contextMenus == "true"){
                    $("#contextMenus").prop('checked', true);
                }
                var integration=localStorage.getItem("integration");
                if(integration == "true"){
                    $("#integration").prop('checked', true);
                }
                var fileSize=localStorage.getItem("fileSize")||500;
                $("#fileSize").val(fileSize);
                var rpc_list=JSON.parse(localStorage.getItem("rpc_list")||'[{"name":"ARIA2 RPC","url":"http://localhost:6800/jsonrpc"}]');
                for(var i in rpc_list){
                    var addBtn=0==i?'<button class="btn btn-success" id="add-rpc">Add RPC</button>':'';
                    var row='<div class="controls"><input type="text" class="input-small" value="'+rpc_list[i]['name']+'" placeholder="RPC Name"><input type="text" class="input-xlarge rpc-path" value="'+rpc_list[i]['url']+'" placeholder="RPC Path" style="width: 305px;">'+addBtn+'</div></div>';
                    if(i == 0)
                        row = '<div class="control-group rpc_list"><label class="control-label">JSON-RPC</label>' + row
                    else
                        row = '<div class="control-group rpc_list">' + row
                    if($(".rpc_list").length>0){
                        $(row).insertAfter($(".rpc_list").eq(i-1));
                    }else{
                        $(row).insertAfter($("fieldset").children().eq(2));
                    }
                }
                console.log($(".rpc_list"));
                var permission_list=JSON.parse(localStorage.getItem("permission_list")||'[{"usermane":"","password":"","url":""}]');
                for(var i in permission_list){
                    var addBtn=0==i?'<button class="btn btn-success" id="add-permission">Add Permission</button>':'';
                    var row='<div class="controls"><input type="text" class="input-small" value="'+permission_list[i]['username']+'" placeholder="UserNames"><input type="text" class="input-small" value="'+permission_list[i]['password']+'" placeholder="Password"><input type="text" class="input-xlarge rpc-path" value="'+permission_list[i]['urlpath']+'" placeholder="UrlPath">'+addBtn+'</div></div>';
                    if(i == 0)
                        row = '<div class="control-group permission_list"><label class="control-label">Aria2c-Permission</label>' + row
                    else
                        row = '<div class="control-group permission_list">' + row
                    if($(".permission_list").length>0){
                        $(row).insertAfter($(".permission_list").eq(i-1));
                    }else{
                        $(row).insertAfter($("fieldset").children().eq(2));
                    }
                }
                var black_site =JSON.parse(localStorage.getItem("black_site"));
                if(black_site){
                    $("#black-site").val(black_site.join("\n"));
                }
                var white_site =JSON.parse(localStorage.getItem("white_site"));
                if(white_site){
                    $("#white-site").val(white_site.join("\n"));
                }
                $("#add-rpc").on("click",function(){
                    var rpc_form='<div class="control-group rpc_list">'+
                        '<div class="controls">'+
                          '<input type="text" class="input-small"  placeholder="RPC Name">'+
                          '<input type="text" class="input-xlarge rpc-path"  placeholder="RPC Path" style="width: 305px;"></div></div>';
                    $(rpc_form).insertAfter($(".rpc_list")[0]);
                });
                $("#add-permission").on("click",function(){
                    var permission_form='<div class="control-group permission_list">'+
                        '<div class="controls">'+
                            '<input type="text" class="input-small" placeholder="UserName">'+
                            '<input type="text" class="input-small" placeholder="Password">'+
                            '<input type="text" class="input-xlarge rpc-path" placeholder="UrlPath"></div></div>';
                    $(permission_form).insertAfter($(".permission_list")[0]);
                });
                $("#save").on("click",function(){
                    self.save();
                });
                $("#reset").on("click",function(){
                    localStorage.clear();
                    location.reload();
                });
            },
            save:function(){
                var rpc_list=[];
                var permission_list=[];
                var jsonrpc_history=[];
                for(var i=0;i<$(".rpc_list").length;i++){
                    var child=$(".rpc_list").eq(i).children().eq(1).children();
                    if(child.eq(0).val()!= ""&&child.eq(1).val()!= ""){
                        rpc_list.push({"name":child.eq(0).val(),"url":child.eq(1).val()});
                        jsonrpc_history.push(child.eq(1).val());
                    }
                }
                for(var i=0;i<$(".permission_list").length;i++){
                    var child=$(".permission_list").eq(i).children().eq(1).children();
                    if(child.eq(0).val()!= ""&&child.eq(1).val()!= ""){
                        permission_list.push({"username":child.eq(0).val(),"password":child.eq(1).val(),"urlpath":child.eq(2).val()});
                    }
                }
                localStorage.setItem("rpc_list", JSON.stringify(rpc_list));
                localStorage.setItem("permission_list", JSON.stringify(permission_list));
                localStorage.setItem("jsonrpc_history", JSON.stringify(jsonrpc_history));
                if($("#contextMenus").prop('checked') == true){
                    localStorage.setItem("contextMenus", true);
                }else{
                    localStorage.setItem("contextMenus", false);
                }
                if($("#integration").prop('checked') == true){
                    localStorage.setItem("integration", true);
                }else{
                    localStorage.setItem("integration", false);
                }
                var fileSize=$("#fileSize").val();
                localStorage.setItem("fileSize", fileSize);
                var black_site =$("#black-site").val().split("\n");
                localStorage.setItem("black_site", JSON.stringify(black_site));
                var white_site =$("#white-site").val().split("\n");
                localStorage.setItem("white_site", JSON.stringify(white_site));
            }
        };
    })();  
    config.init();
});

