class InstrumentsModal {
  constructor() {
    this.instruments = ["piano", "violin"];
    this.modalOpen = false;
    this.toggleInstrumentsModal();
  }

  populateModal(callback){
    this.instruments.forEach((instrument) => {
      let src = `./components/${instrument}_image.png`;

      $("#instruments-modal").append(`
        <div class="modal-image ${instrument}-image">
        </div>`);

      $(`.${instrument}-image`).on("click",() => {
        callback(instrument);
      });
    });
  }

  openModal(modal) {
    $('.dashboard-labels').text("Close Modal");
    $('.modal-image').css("display","block");
    this.modalOpen = true;

    modal.addClass("instruments-modal-open");
    modal.animate({
      height: "300px",
      width: "300px",
      top: "53%",
      left: "3%",
    });
  }

  closeModal(modal) {
    $('.dashboard-labels').text("Add Instrument");
    $('.modal-image').css("display","none");
    this.modalOpen = false;

    modal.animate({
      height: "2%",
      width: "1%",
      top: "47%",
      left: "11%",
    });

    setTimeout(()=> {
      modal.removeClass("instruments-modal-open");
    }, 401);
  }

  toggleInstrumentsModal() {
    $(".dashboard-labels").on("click",(e) =>{
      e.stopPropagation();
      const modal = $('#instruments-modal');

      if (this.modalOpen === false) {
        this.openModal(modal);
      } else {
        this.closeModal(modal);
      }
    });
  }
}
export default InstrumentsModal;
