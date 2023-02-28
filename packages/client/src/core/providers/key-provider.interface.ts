export interface IKeyProvider {
  down(key: string, layout: string, name: string): void
  up(key: string, layout: string, name: string): void
}