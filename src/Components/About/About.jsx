import React from "react";
import "./About.css";
import Border from "../../assets/images/border-image.png";

export default function About() {
  return (
    <div className="main-container">
      <div className="flex flex-col justify-center items-center py-20">
        <h1 className="text-5xl f-f-g-s ">About Us</h1>
        <div className="mt-4">
          <img src={Border} alt="border bottom" />
        </div>
        <div className="pt-10">
          <p className="text-center font-normal text-[17px] f-f-g-m text-neutral-500 leading-[1.7]">
            Leo vel fringilla est ullamcorper. Viverra ipsum nunc aliquet
            bibendum enim. Suscipit tellus mauris a diam maecenas sed. Rhoncus
            est pellentesque elit ullamcorper dignissim cras tincidunt lobortis.
            Tempus iaculis urna id volutpat lacus laoreet non curabitur.
            Sollicitudin tempor id eu nisl nunc mi ipsum. Senectus et netus et
            malesuada fames ac turpis egestas sed. Faucibus purus in massa
            tempor nec feugiat nisl. Quis commodo odio aenean sed adipiscing
            diam donec adipiscing tristique. Enim nunc faucibus a pellentesque
            sit amet porttitor. Orci porta non pulvinar neque laoreet
            suspendisse interdum consectetur. Volutpat commodo sed egestas
            egestas fringilla phasellus faucibus scelerisque. Et netus et
            malesuada fames ac turpis. Nisi quis eleifend quam adipiscing vitae
            proin sagittis.
            <br />
            <br />
            Pulvinar elementum integer enim neque. Et netus et malesuada fames
            ac turpis. Lectus nulla at volutpat diam ut. Fringilla urna
            porttitor rhoncus dolor purus. Maecenas accumsan lacus vel facilisis
            volutpat est velit egestas dui. Id faucibus nisl tincidunt eget
            nullam non nisi est sit. Mi proin sed libero enim sed. Ullamcorper
            sit amet risus nullam eget felis eget nunc. Natoque penatibus et
            magnis dis. Iaculis urna id volutpat lacus. Pharetra et ultrices
            neque ornare aenean euismod elementum nisi. Vitae ultricies leo
            integer malesuada nunc vel risus commodo viverra. Vehicula ipsum a
            arcu cursus. Ac orci phasellus egestas tellus rutrum tellus
            pellentesque eu. Pellentesque elit ullamcorper dignissim cras. Ut
            placerat orci nulla pellentesque dignissim. Cursus risus at ultrices
            mi tempus imperdiet nulla malesuada pellentesque. Vestibulum morbi
            blandit cursus risus. In egestas erat imperdiet sed euismod.
            Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec.
            Urna neque viverra justo nec.
          </p>
        </div>
      </div>
    </div>
  );
}
