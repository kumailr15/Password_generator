import { useState,useCallback,useEffect,useRef } from 'react'


function App() {
  const [passward,Setpassward] = useState("")
  const [length,Setlength] = useState(8)
  const [number,Setnumber] = useState(false)
  const [character,Setcharacter] = useState(false)


  const passwardRef = useRef(null);



  const passwardGenerator = useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    if (number) str+="0123456789";
    if (character) str+="!£$%^&*()-+";

    for (let i=1;i<=length;i++){
      const char=Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }
    Setpassward(pass);
  },[length,number,character]);

  
  const copytoclipboard = useCallback(()=>{
    passwardRef.current?.select()
    window.navigator.clipboard.writeText(passward)
  },[passward])


  useEffect(()=>{
    passwardGenerator();
  },[length,number,character,passwardGenerator])

  
  
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>PASSWORD GENERATOR</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={passward}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwardRef}
        />
        <button
        onClick={copytoclipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
        
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {Setlength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={number}
          id="numberInput"
          onChange={() => {
              Setnumber((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={character}
              id="characterInput"
              onChange={() => {
                  Setcharacter((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
</div>
    </>
  )
}

export default App
