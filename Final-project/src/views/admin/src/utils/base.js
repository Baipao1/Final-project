const base = {
    get() {
        return {
            url : "http://localhost:8080/Final-project/",
            name: "Final-project",
            // logout到Home链接
            indexUrl: 'http://localhost:8080/Final-project/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "Taomao Online Mall"
        } 
    }
}
export default base
