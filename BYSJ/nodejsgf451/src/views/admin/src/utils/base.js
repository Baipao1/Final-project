const base = {
    get() {
        return {
            url : "http://localhost:8080/nodejsgf451/",
            name: "nodejsgf451",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/nodejsgf451/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "网上商城"
        } 
    }
}
export default base
