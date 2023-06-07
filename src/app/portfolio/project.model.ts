export class Project {
  constructor(
    public id: number,
    public title: string,
    public techStack: string[],
    public description: string,
    public image: string,
    public githubLink: string,
    public liveTestLink: string,
  ) { }
}
