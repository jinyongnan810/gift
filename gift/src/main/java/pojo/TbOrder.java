package pojo;

import java.util.Date;

public class TbOrder {
    private Long id;

    private Long giftid;

    private String gifttitle;

    private String giftimg;

    private Long userid;

    private String username;

    private String address;

    private String contact;

    private Integer status;

    private Date created;

    private Date finished;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getGiftid() {
        return giftid;
    }

    public void setGiftid(Long giftid) {
        this.giftid = giftid;
    }

    public String getGifttitle() {
        return gifttitle;
    }

    public void setGifttitle(String gifttitle) {
        this.gifttitle = gifttitle == null ? null : gifttitle.trim();
    }

    public String getGiftimg() {
        return giftimg;
    }

    public void setGiftimg(String giftimg) {
        this.giftimg = giftimg == null ? null : giftimg.trim();
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact == null ? null : contact.trim();
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getFinished() {
        return finished;
    }

    public void setFinished(Date finished) {
        this.finished = finished;
    }
}