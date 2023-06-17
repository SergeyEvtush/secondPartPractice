const filterByType = (type, ...values) => values.filter(value => typeof value === type),//получаем массив отфильтрованных элементов по типу

	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));//сщздаем массив из коллекции элементов состраницы
		responseBlocksArray.forEach(block => block.style.display = 'none');//перебираем полученный массив и присваиваем каждому элементу массива стиль display:none
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		hideAllResponseBlocks();//запускаем функцию со строчки 3
		document.querySelector(blockSelector).style.display = 'block';//получаем эелемент состраницы() и делаем его видимым display = 'block'
		if (spanSelector) {//если есть селектор spanSelector то добавляем в него текст msgText
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
//функция показа ошибки
	// выводим на экран блокв блок с классом '.dialog__response-block_error', в блок с id 'error' добавляем текст msgText
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
//функция показа результата
	// выводим на экран блокв блок с классом '.dialog__response-block_ok', в блок с id '#ok' добавляем текст msgText
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
//функция показа отсутствия результата
	// выводим на экран блокв блок с классом '.dialog__response-block_no-results' "пока нечего показать"
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
//функция отлова ошибок
	//если все элементы есть то отработает блок try
	//иначе выведет ошибку
	tryFilterByType = (type, values) => {
		try {
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");//делаем строку из (`filterByType('${type}', ${values})`) объединяем через запятую и все это присваиваем постоянной valuesArray
			//если у valuesArray есть свойство length то alertMsg=`Данные с типом ${type}: ${valuesArray}`,
			//усли наоборот то alertMsg=`Отсутствуют данные типа ${type}`
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			//выводим результат с пом функции showResults(); в котрую помещаем alertMsg
			showResults(alertMsg);
		} catch (e) {
			//ловим ошибку и выводим сообщение о ней
			showError(`Ошибка: ${e}`);
		}
	};
//получаем кнопку по id '#filter-btn'
const filterButton = document.querySelector('#filter-btn');
//ловим клик по кнопке filterButton
filterButton.addEventListener('click', e => {
	//получаем input по id '#type'
	const typeInput = document.querySelector('#type');
	//получаем input по id '#data'
	const dataInput = document.querySelector('#data');
//условие:если у dataInput value равно пустой строке
	if (dataInput.value === '') {
		//с пом метода сообщений об ошибке выводим 'Поле не должно быть пустым!'
		dataInput.setCustomValidity('Поле не должно быть пустым!');
//блок со словами пока нечего показать
		showNoResults();
	} else {
		//эта подсказка пустая
		dataInput.setCustomValidity('');
		//отключаем стандартное поведение кнопки
		e.preventDefault();
		//в фуекцию фильтрации закидываем данные с обоих input,убирая пробелы с двух сторон
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

