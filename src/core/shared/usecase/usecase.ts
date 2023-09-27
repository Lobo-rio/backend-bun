export default interface UseCase<E, S> {
    executar(data: E): Promise<S>
}