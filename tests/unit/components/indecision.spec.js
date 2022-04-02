// *Cosas para poder montar y renderizar el componente
import { shallowMount, mount } from '@vue/test-utils'

// *Importando el componente para poder usarlo
import Indecision from '@/components/Indecision'

describe('Indecision component', () => {

    // ! wrapper
    let wrapper
    let clSpy

    // ! mock del fetch
    // se recibe una promesa y se resuelve, a su vez, esta promesa
    // recibe un objeto json y lo resuelve, esta otra promesa, 
    // tambien recibe un objeto por parte del fetch
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({
            answer: 'yes',
            forced: false,
            image: 'https://yesno.wtf/assets/yes/2.gif'
        })
    }))

    beforeEach(() => {

        wrapper = shallowMount(Indecision)

        // * spyOn recibe dos parametros, el primero es el objeto a espiar
        // * y el segundo es el metodo. EJ: (console, 'log')
        clSpy = jest.spyOn(console, 'log')

        // *** Codigo para limpiar todos los mocks y que no almacenen valores
        jest.clearAllMocks()
    })

    // ! snapshot
    test( 'match with snapshot', () => expect(wrapper.html()).toMatchSnapshot() )

    // ! definiendo las pruebas
    test('input debe disparar el console.log', async() => {

        // !!! SPY Y MOCKS
        // * Spy es para espiar metodos, eventos, etc
        // * Los mocks son para simular las peticiones http

        // *** Aplicando un mock para acceder al metodo getAnswer
        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')

        const input = wrapper.find('input')
        await input.setValue('hola mundo')

        // *** Espera el console.log . para ver que haya sido llamado:
        // * .toHaveBeenCalled()
        // *** Espera el console.log . para ver que haya sido llamado n veces:
        // * .toHaveBeenCalledTimes(n)
        expect(clSpy).toHaveBeenCalledTimes(1)

        // *** Para verificar que algo no haya sido llamado:
        // * .not.toHavaBeenCalled()
        // * .toHaveBeenCalledTimes(0)
        expect(getAnswerSpy).toHaveBeenCalledTimes(0)
    })

    test('"?" debe disparar el getAnswer', async() => {
    
        // ToDo: Probar que el getAnswer fue llamado:
        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')

        const input = wrapper.find('input')
        await input.setValue('hola?')

        expect(clSpy).toHaveBeenCalledTimes(1)
        expect(getAnswerSpy).toHaveBeenCalled()
        
    });

    test('test getAnswer', async() => {
        
        await wrapper.vm.getAnswer()

        const img = wrapper.find('img')

        expect(img.exists()).toBeTruthy()
        expect(wrapper.vm.img).toBe('https://yesno.wtf/assets/yes/2.gif')
        expect(wrapper.vm.answer).toBe('Si!')

    });

    test('test getAnswer - fail API', async() => {
        
        // ToDo: fallo en el api
        fetch.mockImplementationOnce( () => Promise.reject('api is down') )

        await wrapper.vm.getAnswer()

        const img = wrapper.find('img')

        expect(img.exists()).toBeFalsy()

        expect(wrapper.vm.answer).toBe('No se pudo cargar del api')

    });

})