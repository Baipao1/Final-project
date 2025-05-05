const base = {
    get() {
        return {
            url : "http://localhost:8080/Final-project/",
            name: "Final-project",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/Final-project/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "网上商城"
        } 
    }
}
export default base
