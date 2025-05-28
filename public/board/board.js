const  columns = document.querySelectorAll('.column_cards');

let draggedCard;

const dragStart = (event) => {
    draggedCard = event.target;
    event.dataTransfer.effectAllowed = "move";
};

const dragOver = (event) => {
    event.preventDefault();
};

const dragEnter = ({target}) => {
    if(target.classList.contains('column_cards')) {
        target.classList.add('column_hightlight');
    }
};

const dragLeave = ({target}) => {
    target.classList.remove('column_hightlight');
};

const drop = ({target}) => {
    if(target.classList.contains('column_cards')){
        target.classList.remove('column_hightlight');
        target.append(draggedCard);
    }
 
};

const createCard = ({ target }) => {
    if (!target.classList.contains('column_cards')) return;

    const card = document.createElement('section');

    card.className = 'card';
    card.draggable = true;
    card.contentEditable = true;

    card.addEventListener('focusout', () => {
        card.contentEditable = false;

        if(!card.textContent) card.remove();
    });

    card.addEventListener('dragstart', dragStart);

    target.append(card);
    card.focus();
}

columns.forEach((column) => {
    column.addEventListener("dragover", dragOver)
    column.addEventListener("dragenter", dragEnter) 
    column.addEventListener("dragleave", dragLeave)
    column.addEventListener("drop", drop)
    column.addEventListener("dblclick", createCard)
});


 