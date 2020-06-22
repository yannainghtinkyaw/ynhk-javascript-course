// Section 6
// Destructure

// const [name,no]=['ynhk',11];
// console.log(name);
// console.log(no);

// const desObj={
// 	firstName:'my',
// 	lastName:'ynhk'
// }

// const {firstName,lastName}=desObj;
// console.log(firstName);
// console.log(lastName);

// calcAgeREtriement=(year)=>{
// 	const age=new Date().getFullYear() - year;
// 	return [age, 65 - age];
// }

// const [age,retriement]=calcAgeREtriement(1994);
// console.log(age);
// console.log(retriement);

// //Array ES6/ES2015
// const h =document.querySelector('h1');
// const boxes=document.querySelectorAll('.box');


// const all=[h,...boxes]; //concat and array
// console.log(all);
// console.log(Array.from(all)); // change array

// all.forEach(cur => {
// console.log(cur.textContent)
// });

// function isFullAge(limit, ...year){
// 	console.log(limit);
// 	console.log(year);
// }

// isFullAge(11,2222,3333);

// Asynchronous
// Promise

// const getIDs=new Promise((resolve,reject)=>{
// 	setTimeout(()=>{
// 		resolve([111,222,333,444]);
// 	},2000);
// });

// const getRecipe = recID =>{
// 	return new Promise((resolve,reject)=>{
// 		setTimeout(ID=>{
// 			const recipe={title:'Ynhk',publisher:'summoe'};
// 			resolve(`${ID}: ${recipe.title}`);
// 		},1500,recID);
// 	});
// };



/** Normal Promise ----------------------- */

// getIDs
// .then(IDs =>{
// 	console.log(IDs);
// 	return getRecipe(IDs[2]);
// })
// .then(recipe =>{
// 	console.log(recipe);
// })
// .catch(error => {
// 	console.log(error);
// });


/** Await Aayn ----------------------- */
// const asyAwaitFn = async () => {

// 	const IDs=await getIDs;
// 	console.log(IDs);
// 	const recipe=await getRecipe(IDs[2]);
// 	console.log(recipe);
// }

// asyAwaitFn();

// Return Await Async
// const asyAwaitFn = async () => {

// 	const IDs=await getIDs;
// 	console.log(IDs);
// 	const recipe=await getRecipe(IDs[2]);
// 	console.log(recipe);

// 	return recipe;
// }

// asyAwaitFn().then(res => console.log(`${res} : is the best`));
/** Weather API Call Fetch is Promie */
// fetch('https://www.metaweather.com/api/location/1015662/', {
//       headers : { 
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//        }

//     })
//     .then((response) => response.json())
//     .then((messages) => {console.log(messages);});

const asyAwaitFn = async (woeid) => {
	const result= await fetch (`https://crossorigin.me/https://www.metaweather.com/api/location/${woeid}`);
	const data =await result.json();
	console.log(data)

}

asyAwaitFn(2487956);
asyAwaitFn(44418);