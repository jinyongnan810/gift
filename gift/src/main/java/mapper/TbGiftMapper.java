package mapper;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import pojo.TbGift;
import pojo.TbGiftExample;

public interface TbGiftMapper {
    int countByExample(TbGiftExample example);

    int deleteByExample(TbGiftExample example);

    int deleteByPrimaryKey(Long id);

    int insert(TbGift record);

    int insertSelective(TbGift record);

    List<TbGift> selectByExampleWithBLOBs(TbGiftExample example);

    List<TbGift> selectByExample(TbGiftExample example);

    TbGift selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") TbGift record, @Param("example") TbGiftExample example);

    int updateByExampleWithBLOBs(@Param("record") TbGift record, @Param("example") TbGiftExample example);

    int updateByExample(@Param("record") TbGift record, @Param("example") TbGiftExample example);

    int updateByPrimaryKeySelective(TbGift record);

    int updateByPrimaryKeyWithBLOBs(TbGift record);

    int updateByPrimaryKey(TbGift record);
}